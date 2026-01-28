from fastapi import APIRouter, Depends, Header
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from app.core.deps import get_db
from app.core.errors.error_codes import ErrorCode
from app.core.errors.exceptions import AppException
from app.core.settings import get_settings
from app.schemas.response import Response, ResponseSchema
from app.schemas.scheduled_task import (
    ScheduledTaskDispatchRequest,
    ScheduledTaskDispatchResponse,
)
from app.services.scheduled_task_service import ScheduledTaskService

router = APIRouter(prefix="/internal", tags=["internal"])

scheduled_task_service = ScheduledTaskService()


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
    "/scheduled-tasks/dispatch-due",
    response_model=ResponseSchema[ScheduledTaskDispatchResponse],
)
async def dispatch_due_scheduled_tasks(
    request: ScheduledTaskDispatchRequest,
    _: None = Depends(require_internal_token),
    db: Session = Depends(get_db),
) -> JSONResponse:
    result = scheduled_task_service.dispatch_due(db, limit=request.limit)
    return Response.success(
        data=result.model_dump(), message="Scheduled tasks dispatched"
    )
