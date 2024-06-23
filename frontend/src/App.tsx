import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFile } from "@/hooks/useFile";

function App() {
  const { handleFileChange, handleSubmit, loading } = useFile();

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="flex flex-col gap-4 p-4">
        <h1 className="text-2xl text-center">Genera QR Code</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 border border-neutral-600 p-4 rounded-xl w-fit"
        >
          <div className="grid w-full max-w-sm items-center gap-4">
            <Label htmlFor="picture">File CSV (con intestazione)</Label>
            <Input
              id="picture"
              type="file"
              name="file"
              className="w-fit"
              onChange={handleFileChange}
            />
          </div>
          <Button type="submit" className="w-full">
            {loading ? "Generazione codici..." : "Carica file"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default App;
