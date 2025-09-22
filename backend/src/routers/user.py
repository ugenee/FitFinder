from typing import Annotated
from fastapi import APIRouter, Depends
from db.models import User
from core.dependencies import get_current_user, current_user_responses
from schemas.user import UserResponse

router = APIRouter(prefix="/user", tags=["user"])

@router.get("/me", response_model=UserResponse, responses=current_user_responses)
async def read_users_me(current_user: Annotated[User, Depends(get_current_user)]):
    return current_user
