const ConfirmationModal = ({ isConfirm, onConfirm, subtitle, setIsConfirm, title }) => {
  return (
    <div
      className={`fixed w-full h-full inset-0 flex items-center justify-center transition-all duration-300 bg-black/50 ${
        isConfirm ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div className={`bg-white w-full max-w-xs px-4 pt-3 pb-4 rounded-md duration-300 ${isConfirm ? "scale-100" : "scale-75"}`}>
        <h3 className="text-lg font-semibold ">{title}</h3>
        <p className=" text-gray-500 ">{subtitle} </p>
        <div className="flex items-center gap-2 mt-4">
          <button onClick={() => setIsConfirm(false)} className="border-button border-gray-300 bg-gray-200">
            Cancel
          </button>
          <button onClick={onConfirm} className="button-primary  w-full">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
