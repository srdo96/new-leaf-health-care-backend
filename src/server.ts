import app from "./app";
import { env } from "./app/config/env";

const PORT = env.PORT;

const bootstrap = () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server is running on http:/localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
    }
};

bootstrap();
