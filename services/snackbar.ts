import snack from "node-snackbar";

const Snackbar = {
    show: (message: string, type: string = "info") => {
        snack.show({
            text: message, 
            duration: 3000,
            actionTextColor: '#FF6D45',
        });

        return;
    },
}

export {
    Snackbar,
}