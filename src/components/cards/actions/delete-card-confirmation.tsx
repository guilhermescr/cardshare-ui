export default function DeleteCardConfirmation() {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
      <p>Are you sure you want to delete this card?</p>
      <div className="mt-6 flex justify-end">
        <button className="bg-red-500 text-white px-4 py-2 rounded-md mr-2">
          Delete
        </button>
        <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md">
          Cancel
        </button>
      </div>
    </div>
  );
}
