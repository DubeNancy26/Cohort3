import { Zap } from "lucide-react";
import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/home" className="flex items-center gap-3">

      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#c8ff00]">
        <Zap
          size={24}
          strokeWidth={3.5}
          className="fill-black text-black"
        />
      </div>

      <span className="text-[28px] font-bold tracking-tight">
        <span className="text-white">Sky</span>
        <span className="text-[#c8ff00]">Mart</span>
      </span>

    </Link>
  );
}

export default Logo;