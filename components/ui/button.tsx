export function Button({ children, ...props }: any) {
  return (
    <button
      className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
      {...props}
    >
      {children}
    </button>
  );
}