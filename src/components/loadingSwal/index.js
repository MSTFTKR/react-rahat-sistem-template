import Swal from 'sweetalert2';

// Yükleniyor Swal bileşeni
export const showLoadingSwal = (textContent, html, isUpdate, showLoadingInUpdate) => {
    if (isUpdate) {
        Swal.update({
            text: html ? undefined : textContent ? textContent : 'Yanıt bekleniyor',
            html,
        });
        if (showLoadingInUpdate) {
            Swal.showLoading();
        }
    } else {
        Swal.fire({
            title: 'Lütfen Bekleyiniz',
            text: html ? undefined : textContent ? textContent : 'Yanıt bekleniyor',
            html,
            icon: 'info',
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            customClass: {
                popup: 'swal2-content-centered',
            },
            didOpen: () => {
                document.querySelector('.swal2-container').style.zIndex = '9999';
            },
            willOpen: () => {
                Swal.showLoading();
            },
        });
    }
};
