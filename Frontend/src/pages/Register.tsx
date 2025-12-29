import { errorToast, infoToast } from "@/components/CustomSonner";
import { Button } from "@/components/ui/button"
import icons from "@/constants/icons"
import images from "@/constants/images";
import { isValidEmailStrict, isValidPassword } from "@/lib/validation";
import { useAuth } from "@/providers/authProvider";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Register() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const navigate = useNavigate();
	const {register, isLoggedIn} = useAuth();

	const handleRegister = async () => {
		try {
			if (!isValidEmailStrict(email)) 
				throw new Error('Correo inválido');
			if (!isValidPassword(password))
				throw new Error('Contraseña débil');
			if (password !== confirmPassword)
				throw new Error('Las contraseñas no coinciden');

			await register(email, password);

			infoToast(
				'Registro exitoso',
				'Revisa tu correo para verificar tu cuenta'
			);

			navigate('/login');

		}catch (error:any) {
			errorToast(
				'Error al registrar usuario',
				error.message
			)
		}
	};

	if(isLoggedIn) {
		navigate('/');
	};

  return (
    <div className="w-screen h-screen flex items-center justify-center p-10 md:gap-10 md:p-0 overflow-hidden">
      {/* Background */}
      <div className="blur-bg">
        <div className="blur-blob blob-purple" />
        <div className="blur-blob blob-blue" />
        <div className="blur-blob blob-purple-2" />
      </div>

			<img
				className="hidden md:block"
				src={images.mosaic}
			/>
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
						Unete a MagisMusic
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
					{(email.trim().length > 5 && !isValidEmailStrict(email)) && (
						<span className="text-sm text-destructive">Por favor ingresa un correo válido.</span>
					)}
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
					{(password.trim().length > 0 && !isValidPassword(password)) && (
						<>
							<span className="text-sm text-destructive">La contraseña debe contener:</span>
							<span className="text-sm text-destructive">• Por lo menos 8 caracteres</span>
							<span className="text-sm text-destructive">• Una letra mayúscula</span>
							<span className="text-sm text-destructive">• Un número</span>
							<span className="text-sm text-destructive">• Un carácter especial ! @ # $ % ^ & * _ -</span>
						</>
					)}
					<input 
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						className="
							w-72 md:w-md outline-none border-2 text-secondary font-regular
							p-3 rounded-xl focus:border-ring focus:text-white
							transition-all duration-300 ease-in-out
						" 
						type="password" 
						placeholder="Confirma contraseña"
					/>
					{(confirmPassword.trim().length > 0 && isValidPassword(password) && confirmPassword !== password) && (
						<span className="text-sm text-destructive">Las contraseñas no coinciden.</span>
					)}

					<Button onClick={handleRegister} className="cursor-pointer">Registrarte</Button>
				</div>
				
			</div>


    </div>
  )
}

export default Register