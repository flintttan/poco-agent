import uuid

from fastapi import APIRouter, Depends, Header
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from app.core.deps import get_db
from app.core.errors.error_codes import ErrorCode
from app.core.errors.exceptions import AppException
from app.core.settings import get_settings
from app.schemas.response import Response, ResponseSchema
from app.schemas.user_input_request import (
    UserInputRequestCreateRequest,
    UserInputRequestResponse,
)
from app.services.user_input_request_service import UserInputRequestService

router = APIRouter(prefix="/internal", tags=["internal"])

user_input_service = UserInputRequestService()


def require_internal_token(
    x_internal_token: str | None = Header(default=None, alias="X-Internal-Token"),
) -> None:
    settings = get_settings()
    if not settings.internal_api_token:
        raise AppException(
            error_code=ErrorCode.FORBIDDEN,
            message="Internal API token is not configured",
        )
    if not x_internal_token or x_internal_token != settings.internal_api_token:
        raise AppException(
            error_code=ErrorCode.FORBIDDEN,
            message="Invalid internal token",
        )


@router.post(
    "/user-input-requests",
    response_model=ResponseSchema[UserInputRequestResponse],
)
async def create_user_input_request(
    request: UserInputRequestCreateRequest,
    _: None = Depends(require_internal_token),
    db: Session = Depends(get_db),
) -> JSONResponse:
    result = user_input_service.create_request(db, request)
    return Response.success(data=result, message="User input request created")


@router.get(
    "/user-input-requests/{request_id}",
    response_model=ResponseSchema[UserInputRequestResponse],
)
async def get_user_input_request(
    request_id: uuid.UUID,
    _: None = Depends(require_internal_token),
    db: Session = Depends(get_db),
) -> JSONResponse:
    result = user_input_service.get_request(db, request_id=str(request_id))
    return Response.success(data=result, message="User input request retrieved")
