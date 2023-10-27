// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: 'main.js',
            },
        },
        assetsInclude: [
            "public/sophie.fbx",
            "public/sophie/Idle.fbx",
            "public/sophie/Walking.fbx",
            "public/sophie/Fast Running.fbx",
            "public/sophie/Step Hip Hop Dance.fbx",
            "public/sophie/Sitting Idle.fbx",
            "skybox/penguins/arid_bk.jpg",
            "skybox/penguins/arid_dn.jpg",
            "skybox/penguins/arid_ft.jpg",
            "skybox/penguins/arid_lf.jpg",
            "skybox/penguins/arid_rt.jpg",
            "skybox/penguins/arid_up.jpg",
        ],
    },
});
