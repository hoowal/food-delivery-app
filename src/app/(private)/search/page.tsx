import Categories from "@/components/categoties";
import RestaurantList from "@/components/restaurant-list";
import { fetchCategoryRestaurants } from "@/lib/restaurants/api";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ category: string }>;
}) {
  const { category } = await searchParams;

  if (category) {
    const { data: categoryRestaurants, error: fetchError } =
      await fetchCategoryRestaurants(category);
    console.log("categoryRestaurants", categoryRestaurants);

    return (
      <>
        <div className="mb-4">
          <Categories />
        </div>
        {/* <div className="mb-4 text-2xl font-bold">{category}</div> */}
        {!categoryRestaurants ? (
          <p className="text-destructive">{fetchError}</p>
        ) : categoryRestaurants.length > 0 ? (
          <RestaurantList restaurants={categoryRestaurants} />
        ) : (
          <p>カテゴリ{category}に一致するレストランがありません。</p>
        )}
      </>
    );
  }

  return <div>SearchPage</div>;
}
