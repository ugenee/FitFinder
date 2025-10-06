from pydantic_settings import BaseSettings
from pydantic import Field, SecretStr, field_validator


class Settings(BaseSettings):
    SECRET_KEY: str = Field(default=...)
    DATABASE_URL: str = Field(default=...)
    GEOAPIFY_API_KEY: str = Field(default=...)
    MAIL_USERNAME: str = Field(default=...)
    MAIL_PASSWORD: SecretStr = Field(default=...)
    MAIL_FROM: str = Field(default=...)
    MAIL_PORT: int = Field(default=...)
    MAIL_SERVER: str = Field(default=...)
    MAIL_FROM_NAME: str = Field(default=...)
    GOOGLE_PLACES_API_KEY: str = Field(default=...)

    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60

    class Config:
        env_file = ".env"
    
    @field_validator('SECRET_KEY')
    def validate_secret_key(cls, v):
        if len(v) < 32:
            raise ValueError("Secret key must be >=32 characters")
        return v

    @field_validator('DATABASE_URL')
    def validate_db_url(cls, v):
        if not v.startswith(("mysql+aiomysql://")):
            raise ValueError("Invalid MySQL database URL format")
        return v


settings = Settings()