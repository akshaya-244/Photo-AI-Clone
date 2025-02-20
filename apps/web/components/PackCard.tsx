import Image from "next/image";

interface PackCardInter{
    imageUrl: string,
    packName: string,
    packDescription: string
}
export function PackCard({imageUrl,packName, packDescription } : PackCardInter) {
    return <div>
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
  <Image width={500} height={500} src={imageUrl} alt="Sunset in the mountains" />
  <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">{packName}</div>
    <p className="text-gray-700 text-base">
      {packDescription}
    </p>
  </div>
  <div className="px-6 pt-4 pb-2">
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
  </div>
</div>
    </div>
}