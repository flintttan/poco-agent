import os
import re
import uuid

from fastapi import APIRouter, Depends, File, UploadFile
from fastapi.responses import JSONResponse

from app.core.deps import get_current_user_id
from app.core.settings import get_settings
from app.schemas.input_file import InputFile
from app.schemas.response import Response, ResponseSchema
from app.services.storage_service import S3StorageService

router = APIRouter(prefix="/attachments", tags=["attachments"])

storage_service = S3StorageService()

_FILENAME_CLEAN = re.compile(r"[^a-zA-Z0-9._-]+")


def _sanitize_filename(filename: str) -> str:
    clean = os.path.basename(filename or "").strip()
    clean = _FILENAME_CLEAN.sub("_", clean)
    return clean or "upload.bin"


def _get_file_size(file: UploadFile) -> int | None:
    try:
        file.file.seek(0, os.SEEK_END)
        size = file.file.tell()
        file.file.seek(0)
        return size
    except Exception:
        return None


@router.post("/upload", response_model=ResponseSchema[InputFile])
async def upload_attachment(
    file: UploadFile = File(...),
    user_id: str = Depends(get_current_user_id),
) -> JSONResponse:
    """Upload a user attachment to storage."""
    settings = get_settings()
    max_size_bytes = settings.max_upload_size_mb * 1024 * 1024

    filename = _sanitize_filename(file.filename or "")
    attachment_id = str(uuid.uuid4())
    key = f"attachments/{user_id}/{attachment_id}/{filename}"

    size = _get_file_size(file)
    if size is not None and size > max_size_bytes:
        return Response.error(
            code=413,
            message=f"File too large. Max {settings.max_upload_size_mb}MB.",
            data={"max_bytes": max_size_bytes, "actual_bytes": size},
            status_code=413,
        )

    storage_service.upload_fileobj(
        fileobj=file.file,
        key=key,
        content_type=file.content_type,
    )

    payload = InputFile(
        id=attachment_id,
        type="file",
        name=filename,
        source=key,
        size=size,
        content_type=file.content_type,
    )
    return Response.success(data=payload, message="Attachment uploaded successfully")
