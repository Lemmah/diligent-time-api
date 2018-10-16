import app from "./app";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  /* tslint:disable-next-line */
  console.log(`Express server is listening on port ${PORT}`);
});
