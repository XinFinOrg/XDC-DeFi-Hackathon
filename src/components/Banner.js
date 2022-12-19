import { MegaphoneIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Banner() {
  return (
    <div className="bg-indigo-600">
      <div className="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex w-0 flex-1 items-center">
            <span className="flex rounded-lg bg-indigo-800 p-2">
              <MegaphoneIcon
                className="h-6 w-6 text-white"
                aria-hidden="true"
              />
            </span>
            <p className="ml-3 truncate font-medium text-white text-center">
              <span className="md:hidden">We announced a new product!</span>
              <span className="hidden md:inline ">
                <div className="text-center">
                  We are live at Apothem Network
                </div>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
