interface AlertMessageProps {
  show: boolean;
  type: boolean;
  message: string;
}

const AlertMessage = ({ show, type, message }: AlertMessageProps) => {
  if (!show) return null;

  const alertClasses = {
    true:
      "h-17 flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800",
    false:
      "h-17 flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800",
  };

  return (
    <div className={alertClasses[String(type) as "true" | "false"]} role="alert">
      <svg
        className="shrink-0 inline w-4 h-4 me-3"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <div>
        <span className="font-medium">{type ? "¡Éxito!" : "¡Error!"}</span> {message}
      </div>
    </div>
  );
};

export default AlertMessage;
