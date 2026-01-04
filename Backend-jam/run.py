import uvicorn
from src.core.config import settings

if __name__ == "__main__":
    port = settings.PORT
    
    print(f"Iniciando MagisMusic Jam Backend en el puerto {port}...")
    
    uvicorn.run(
        "src.main:app", 
        host="0.0.0.0", 
        port=port, 
        reload=True
    )