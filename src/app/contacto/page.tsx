export default function Contacto() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
      <h1 className="text-4xl font-bold text-orange-500 mb-6">Contact Me</h1>
      <form className="flex flex-col gap-4 w-80 bg-gray-800 p-6 rounded-lg shadow-lg">
        <input
          type="text"
          placeholder="Your name"
          className="p-2 rounded bg-gray-700 text-white"
        />
        <input
          type="email"
          placeholder="Your email"
          className="p-2 rounded bg-gray-700 text-white"
        />
        <textarea
          placeholder="Write your message..."
          rows={4}
          className="p-2 rounded bg-gray-700 text-white"
        ></textarea>
        <button className="bg-orange-500 hover:bg-orange-600 text-black font-bold py-2 px-4 rounded">
          Send
        </button>
      </form>
    </section>
  );
}
