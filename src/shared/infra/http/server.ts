import { app } from "./app";

const server = () => app.listen(3333, () => console.log("Server On"));

export { server };