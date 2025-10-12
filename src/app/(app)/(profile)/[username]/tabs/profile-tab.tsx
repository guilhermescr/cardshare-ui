import { Users } from 'lucide-react';

export default function ProfileTab() {
  return (
    <section className="bg-white flex flex-col justify-between shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center">
        <div className="mb-5">
          <h2 className="flex items-center gap-2 font-semibold mb-1">
            <Users /> Profile Information
          </h2>
          <p className="text-sm text-gray-500">
            Update your personal information
          </p>
        </div>

        <button
          type="button"
          className="rounded-sm border shadow-xs py-2 px-4 text-sm font-medium cursor-pointer hover:scale-103 active:scale-95 transition"
        >
          Edit Profile
        </button>
      </div>

      <form className="mt-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col flex-1">
            <label className="font-medium text-sm" htmlFor="full-name">
              Full Name
            </label>
            <input
              className="border rounded-sm py-1 px-3 text-sm"
              type="text"
              id="full-name"
              placeholder="John Doe"
            />
          </div>

          <div className="flex flex-col flex-1">
            <label className="font-medium text-sm" htmlFor="email">
              Email
            </label>
            <input
              className="border rounded-sm py-1 px-3 text-sm"
              type="email"
              id="email"
              placeholder="john.doe@example.com"
            />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <label className="font-medium text-sm" htmlFor="bio">
            Bio
          </label>
          <textarea
            className="border rounded-sm py-1 px-3 text-sm"
            id="bio"
            placeholder="Tell us about yourself..."
          ></textarea>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col flex-1">
            <label className="font-medium text-sm" htmlFor="location">
              Location
            </label>
            <input
              className="border rounded-sm py-1 px-3 text-sm"
              type="text"
              id="location"
              placeholder="San Francisco, CA"
            />
          </div>

          <div className="flex flex-col flex-1">
            <label className="font-medium text-sm" htmlFor="website">
              Website
            </label>
            <input
              className="border rounded-sm py-1 px-3 text-sm"
              type="url"
              id="website"
              placeholder="https://johndoe.photography"
            />
          </div>
        </div>
      </form>
    </section>
  );
}
