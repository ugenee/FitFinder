from enum import Enum

from pydantic import BaseModel, EmailStr, Field


class Gender(str, Enum):
    MALE = "Male"
    FEMALE = "Female"

class UserCreate(BaseModel):
    user_gender: Gender
    user_username: str = Field(..., min_length=3)
    user_password: str = Field(..., min_length=8)
    user_email: EmailStr
    user_age: int = Field(..., ge=16, le=80)