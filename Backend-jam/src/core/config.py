from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "MagisMusic Jam Service"
    PORT: int 
    KAFKA_BOOTSTRAP_SERVERS: str
    SERVER_IP: str
    FRONTEND_URL: str 
    SUPABASE_URL: str
    SUPABASE_KEY: str

    model_config = SettingsConfigDict(env_file=".env")

settings = Settings()