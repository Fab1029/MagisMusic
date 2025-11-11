import { toast } from "sonner"

export const errorToast = (title:string, description?: string) => {
	return toast.error(title, {
		description: description,
		duration: 4000,
		style: {
			fontSize: 14,
			color: '#ECEFF1',
			background: '#1E1E1E',
			border: "1px solid rgba(156, 100, 255, 0.5)",   
		}
	})
}