import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFile } from "@/hooks/useFile";

function App() {
  const { handleFileChange, handleSubmit, loading } = useFile();

  return (
    <div className="flex flex-col gap-4 pt-8 min-h-[100dvh] justify-center">
      <h1 className="text-2xl text-center font-bold">Genera QR Code</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 border border-neutral-600 rounded-xl w-fit mx-4 p-4"
      >
        <div className="grid w-full items-center gap-4">
          <Label htmlFor="picture">File CSV (con intestazione)</Label>
          <Input
            id="picture"
            type="file"
            name="file"
            className="w-full"
            onChange={handleFileChange}
          />
        </div>
        <Button type="submit" className="w-full">
          {loading ? "Generazione codici..." : "Carica file"}
        </Button>
      </form>
    </div>
  );
}

export default App;
