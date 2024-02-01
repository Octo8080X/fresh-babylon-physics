interface BabylonAppFormProps {
  valueX: number;
  setValueX: (x: number) => void;
  valueZ: number;
  setValueZ: (z: number) => void;
  onSubmit: (event: Event) => void;
}
export default function BabylonAppForm(props: BabylonAppFormProps) {
  return (
    <>
      <form onSubmit={props.onSubmit}>
        <div class="sm:flex">
          <div class="mb-2 mr-3 flex">
            <label
              for="x-axis"
              class="w-20 block mt-3 text-sm font-medium text-gray-900 dark:text-white"
            >
              X axis
            </label>
            <input
              type="number"
              name="x-axis"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={props.valueX}
              onChange={(e) => props.setValueX(Number(e.target.value))}
              min="-5"
              max="5"
              step="0.1"
            />
          </div>
          <div class="mb-2 mr-3 flex">
            <label
              for="z-axis"
              class="w-20 block mt-3 text-sm font-medium text-gray-900 dark:text-white"
            >
              Z axis
            </label>
            <input
              type="number"
              name="z-axis"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={props.valueZ}
              onChange={(e) => props.setValueZ(Number(e.target.value))}
              min="-5"
              max="5"
              step="0.1"
            />
          </div>
          <div class="mb-2 mr-3">
            <button
              type="submit"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-max"
            >
              Update param!
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
