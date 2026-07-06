import { createServer } from "./server";

const port = process.env.PORT ? Number(process.env.PORT) : 8000;

const app = createServer();

app.listen(port, () => {
  console.log(`Node backend listening on http://localhost:${port}`);
});


