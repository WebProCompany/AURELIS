'use strict';

document.addEventListener('DOMContentLoaded', () => {
    try {
        const menuToggle = document.querySelector('.menu-toggle');

        if (!menuToggle) {
            return;
        }

        menuToggle.addEventListener('click', () => {
            const isExpanded =
                menuToggle.getAttribute('aria-expanded') === 'true';

            menuToggle.setAttribute(
                'aria-expanded',
                String(!isExpanded)
            );
        });
    } catch (error) {
        console.error(
            'AURÉLIS initialization error:',
            error
        );
    }
});
