from enum import Enum
from typing import Optional

from pydantic import BaseModel, EmailStr, Field


class Gender(str, Enum):
    MALE = "Male"
    FEMALE = "Female"

class UserRole(str, Enum):
    USER = "user"
    ADMIN = "admin"

class UserCreate(BaseModel):
    user_gender: Gender
    user_username: str = Field(..., min_length=3)
    user_password: str = Field(..., min_length=8)
    user_email: EmailStr
    user_age: int = Field(..., ge=16, le=80)
    user_role: Optional[UserRole] = UserRole.USER


class UserRead(BaseModel):
    user_id: int
    user_username: str
    user_email: EmailStr
    user_role: UserRole

    class Config:
        from_attributes = True

class UserWithToken(UserRead):
    access_token : str
    token_type : str


class UserResponse(BaseModel):
    user_id: int
    user_age: int
    user_gender: Gender
    user_email: EmailStr
    user_username: str
    user_role: UserRole

    class Config:
        from_attributes = True
