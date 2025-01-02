import Button from "./Button";

export default function FatalError() {
  const reloadPage = () => {
    window.location.reload();
  };

  const exitApp = () => {
    window.close();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Something went wrong</h1>
      <h2 className="text-2xl">
        Try reloading the application, or come back later.
      </h2>
      <div className="flex gap-4 mt-4">
        <Button
          classes="bg-red-400 rounded-full hover:bg-red-600"
          onClick={reloadPage}
        >
          Restart Application
        </Button>
        <Button
          classes="bg-gray-600 rounded-full hover:bg-gray-400"
          onClick={exitApp}
        >
          Exit App
        </Button>
      </div>
    </div>
  );
}
