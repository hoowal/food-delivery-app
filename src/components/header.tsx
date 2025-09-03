import Link from "next/link";
import MenuSheet from "./menuSheet";

export default function Header() {
  return (
    <header className="bg-background h-16 fixed top-0 left-0 w-full">
      <div className="flex items-center  space-x-4 px-4 max-w-[1920px] mx-auto h-full">
        <MenuSheet />
        <div className="font-bold">
          <Link href={"/"}>Delivery APP</Link>
        </div>
        <div>住所を選択</div>
        <div className="flex-1 bg-yellow-200">検索バー</div>
        <div>カード</div>
      </div>
    </header>
  );
}
