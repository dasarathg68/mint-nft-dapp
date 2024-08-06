import { ConnectButton } from "@rainbow-me/rainbowkit";

export const NavBar = () => {
  return (
    <div className="navbar bg-base-100 border z-50 fixed">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">NFT Club Membership</a>
      </div>
      <div className="navbar-end">
        <ConnectButton />
      </div>
      <div className="dropdown dropdown-end">
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
