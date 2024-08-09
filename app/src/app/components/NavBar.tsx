import { ConnectButton } from "@rainbow-me/rainbowkit";

export const NavBar = () => {
  return (
    <div className="navbar bg-base-100 border z-50 fixed flex justify-center items-center">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">NFT Club Membership</a>
      </div>
      <div className="navbar-end">
        <ConnectButton />
      </div>
      <div className="dropdown dropdown-end">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            Themes
            <span className="badge text-xs bg-blue-300">Try!</span>
          </div>
          <div
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-auto shadow"
          >
            <div className="form-control">
              <label className="label cursor-pointer gap-4">
                <span className="label-text">Retro</span>
                <input
                  type="radio"
                  name="theme-radios"
                  className="radio hidden theme-controller "
                  value="retro"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer gap-4">
                <span className="label-text">Cyberpunk</span>
                <input
                  type="radio"
                  name="theme-radios"
                  className="radio hidden theme-controller "
                  value="cyberpunk"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer gap-4">
                <span className="label-text">Lofi</span>
                <input
                  type="radio"
                  name="theme-radios"
                  className="radio hidden theme-controller "
                  value="lofi"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer gap-4">
                <span className="label-text">Dark</span>
                <input
                  type="radio"
                  name="theme-radios"
                  className="radio hidden theme-controller "
                  value="dark"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer gap-4">
                <span className="label-text">Cupcake</span>
                <input
                  type="radio"
                  name="theme-radios"
                  className="radio hidden theme-controller "
                  value="cupcake"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer gap-4">
                <span className="label-text">Synthwave</span>
                <input
                  type="radio"
                  name="theme-radios"
                  className="radio hidden theme-controller "
                  value="synthwave"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer gap-4">
                <span className="label-text">Garden</span>
                <input
                  type="radio"
                  name="theme-radios"
                  className="radio hidden theme-controller "
                  value="garden"
                />
              </label>
            </div>
          </div>
        </div>
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
