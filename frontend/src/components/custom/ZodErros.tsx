export function ZodErrors({ error }: { error: string[] }) {
    if (!error) return null;
    return error.map((err: string, index: number) => (
      <div key={index} className="text-pink-500 font-semibold text-xs italic py-1 pl-10">
        {err}
      </div>
    ));
  }