import Swal from 'sweetalert2';

export const top_right_FalseAlert = message => {
	Swal.fire({
		position: 'top-end',
		icon: 'error',
		title: message,
		showConfirmButton: false,
		timer: 1500,
	});
};

export const top_right_TrueAlert = message => {
	Swal.fire({
		position: 'top-end',
		icon: 'success',
		title: message,
		showConfirmButton: false,
		timer: 1500,
	});
};
