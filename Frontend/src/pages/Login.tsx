import { errorToast } from "@/components/CustomSonner";
import { Button } from "@/components/ui/button"
import icons from "@/constants/icons"
import { useAuth } from "@/providers/authProvider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./blur.css";


function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');


	const navigate = useNavigate();
	const { loginEmail, loginWithGoogle, isLoggedIn } = useAuth();

	const handleLoginEmail = async () => {
		try {
			await loginEmail(
				email,
				password
			)

			navigate('/');
		}catch (error) {
			errorToast(
				'Error al iniciar sesión',
				'Verifica que tu correo y contraseña sean correctos'
			)
		}
	};

	const handleLoginGoogle = async () => {
		try {
			await loginWithGoogle();
		}catch (error) {
			errorToast(
				'Error al inicar sesión con Google',
				'Intenta de nuevo más tarde'
			)
		}
	};

	if(isLoggedIn) {
		navigate('/');
	};

  return (
		<div className="w-screen h-screen flex items-center justify-center">
      {/* Background */}
      <div className="blur-bg">
        <div className="blur-blob blob-purple" />
        <div className="blur-blob blob-blue" />
        <div className="blur-blob blob-purple-2" />
      </div>

      {/* Card / contenido */}
			<div 
				className="
					flex flex-col items-center bg-card rounded-2xl shadow-xl
					md:p-12 gap-6 p-5
					"
				>
				<div className="gap-5 flex flex-col items-center">
					<img
						className="w-28 h-28 md:w-36 md:h-36 object-contain" 
						src={icons.magisMusicIcon}/>
					<h1
						className="text-4xl md:text-6xl font-bold text-center"
					>
						¡Hola de nuevo!
					</h1>
				</div>
				<div className="gap-5 flex flex-col">
					
					<input 
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="
							w-72 md:w-md outline-none border-2 text-secondary font-regular
							p-3 rounded-xl focus:border-ring focus:text-white
							transition-all duration-300 ease-in-out
						" 
						type="email" 
						placeholder="Correo electrónico"
					/>
					<input 
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="
							w-72 md:w-md outline-none border-2 text-secondary font-regular
							p-3 rounded-xl focus:border-ring focus:text-white
							transition-all duration-300 ease-in-out
						" 
						type="password" 
						placeholder="Contraseña"
					/>
					<Button onClick={handleLoginEmail} className="cursor-pointer">Iniciar sesión</Button>
				</div>
				<div className="gap-2 flex flex-col items-center justify-center">
					<span className="text-sm">o</span>
					<Button
						variant="provider"
						onClick={handleLoginGoogle}
					>
						<img
							className="w-6 h-6 object-contain"
							src={icons.googleIcon}
						/>
						Continuar con Google
					</Button>
				</div>
				<div className="gap-1 flex flex-col">
					<h6 className="text-sm">
						¿No tienes cuenta?
					</h6>
					<Button 
						variant="filter" 
						onClick={() => navigate('/register')}
						className="cursor-pointer hover:opacity-60 bg-card"
					>
						Registrarse
					</Button>
				</div>
			</div>


    </div>
    
  )
}

export default Login