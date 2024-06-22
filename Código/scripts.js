document.addEventListener('DOMContentLoaded', function() {
    // Variables para animación de "¿Quiénes Somos?"
    const infoContainer = document.getElementById('info-container');
    let infoAnimated = false;

    // Variables para animación de "Ropa de Moda"
    const ropaInfo = document.getElementById('ropa-info');
    let ropaAnimated = false;

    // Datos de los productos de tenis
    const tennisData = [
        {
            img: 'Tennis1.png',
            desc: 'Tenis Converse Chuck Taylor All Star Plataforma',
            price: '$2,149.00'
        },
        {
            img: 'Tennis2.jpg',
            desc: 'Tenis Adidas Gazell',
            price: '$1,399.00'
        },
        {
            img: 'Tennis3.jpg',
            desc: 'Puma Attacanto FG/AG Jr Blanco-Negro',
            price: '$999.00'
        },
        {
            img: 'Tennis4.jpg',
            desc: 'Tenis Charly Akoyo PFX Road para Hombre',
            price: '$1,899.00'
        }
    ];

    let currentIndex = 0;

    // Función para actualizar los productos de tenis automáticamente
    function updateTennisAutomatically() {
        currentIndex = (currentIndex + 2) % tennisData.length;
        updateTennis();
        setTimeout(updateTennisAutomatically, 5000); // Cambia cada 5 segundos (5000 milisegundos)
    }

    // Llama a la función para comenzar el carrusel automáticamente
    updateTennisAutomatically();

    // Función para actualizar los productos de tenis
    function updateTennis() {
        const tennis1 = document.getElementById('tennis1');
        const tennis2 = document.getElementById('tennis2');

        const nextIndex1 = (currentIndex + 2) % tennisData.length;
        const nextIndex2 = (currentIndex + 3) % tennisData.length;

        tennis1.querySelector('img').src = tennisData[nextIndex1].img;
        tennis1.querySelector('p').textContent = tennisData[nextIndex1].desc;
        tennis1.querySelector('.price').textContent = tennisData[nextIndex1].price;

        tennis2.querySelector('img').src = tennisData[nextIndex2].img;
        tennis2.querySelector('p').textContent = tennisData[nextIndex2].desc;
        tennis2.querySelector('.price').textContent = tennisData[nextIndex2].price;

        tennis1.classList.add('tennis-left');
        tennis2.classList.add('tennis-left');

        setTimeout(() => {
            tennis1.classList.remove('tennis-left');
            tennis2.classList.remove('tennis-left');
        }, 1000);
    }

    // Evento Click para mostrar y ocultar recomendaciones con animación
    document.getElementById('ver-recomendaciones').addEventListener('click', function() {
        const recomendaciones = document.getElementById('recomendaciones');
        const ropaInfo = document.getElementById('ropa-info');

        if (recomendaciones.classList.contains('hidden')) {
            recomendaciones.classList.remove('hidden');
            ropaInfo.classList.remove('hidden');
            ropaAnimated = true;
        } else {
            recomendaciones.classList.add('hidden');
            ropaInfo.classList.add('hidden');
            ropaAnimated = false;
        }

        const button = document.getElementById('ver-recomendaciones');
        button.textContent = button.textContent === 'Ver Recomendaciones' ? 'Ocultar Recomendaciones' : 'Ver Recomendaciones';
    });

    // Evento para enviar el formulario de contacto
    document.getElementById('contacto-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que el formulario se envíe

        // Validación de campos del formulario
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();

        if (nombre === '' || email === '' || mensaje === '') {
            alert('Por favor, completa todos los campos.');
            return; // Detiene el envío del formulario si algún campo está vacío
        }

        // Aquí podrías agregar la lógica para enviar el formulario (por ejemplo, mediante AJAX)
        // Por ahora, solo mostraremos un mensaje de confirmación

        const mensajeEnviado = document.getElementById('mensaje-enviado');
        mensajeEnviado.classList.remove('hidden');

        // Animación para ocultar el formulario
        const formulario = document.getElementById('contacto-form');
        formulario.classList.add('hidden');
    });

    // Animación para mostrar el formulario al hacer clic en "Contáctanos"
    document.getElementById('contacto').addEventListener('click', function() {
        const formulario = document.getElementById('contacto-form');
        formulario.classList.remove('hidden');
    });

    // Evento Scroll para cambiar el color de fondo con degradado
    window.addEventListener('scroll', function() {
        let scrollPosition = window.scrollY;

        if (scrollPosition < 200) {
            document.body.className = '';
        } else if (scrollPosition < 400) {
            document.body.className = 'scroll-200';
        } else if (scrollPosition < 600) {
            document.body.className = 'scroll-400';
        } else {
            document.body.className = 'scroll-600';
        }

        // Animación de "¿Quiénes Somos?" al desplazarse
        const infoSection = document.getElementById('quienes-somos');
        const infoPosition = infoSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.5;

        if (infoPosition < screenPosition && !infoAnimated) {
            infoContainer.classList.add('info-left');
            infoContainer.style.opacity = '1'; // Hace el recuadro visible
            infoSection.querySelector('h2').classList.add('centered'); // Centrar título
            infoAnimated = true;
        }

        // Animación de "Ropa de Moda" al desplazarse
        const ropaSection = document.getElementById('ropa-moda');
        const ropaPosition = ropaSection.getBoundingClientRect().top;

        if (ropaPosition < screenPosition && !ropaAnimated) {
            ropaInfo.style.left = '0'; // Mueve el contenedor a la vista
            ropaAnimated = true;
        }
    });

    // Evento Scroll para menú fijo
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        const fixedMenu = document.getElementById('navbar');

        // Si el scroll baja más allá de la posición del header, se agrega la clase 'fixed-menu'
        if (window.scrollY > header.offsetHeight) {
            fixedMenu.classList.add('fixed-menu');
        } else {
            fixedMenu.classList.remove('fixed-menu');
        }
    });

    // Eventos de KeyPress para cambiar imágenes y navegar entre secciones
    document.addEventListener('keydown', function(event) {
        switch(event.key) {
            case 'ArrowLeft':
                currentIndex = (currentIndex - 2 + tennisData.length) % tennisData.length;
                updateTennis();
                break;
            case 'ArrowRight':
                currentIndex = (currentIndex + 2) % tennisData.length;
                updateTennis();
                break;
            case '0':
                document.getElementById('quienes-somos').scrollIntoView({ behavior: 'smooth' });
                break;
            case '1':
                document.getElementById('ropa-moda').scrollIntoView({ behavior: 'smooth' });
                break;
            case '2':
                document.getElementById('tennis').scrollIntoView({ behavior: 'smooth' });
                break;
            case '3':
                document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });
                break;
        }
    });
});
