const getPlanDataValue = (planData: any) => {
  switch (planData) {
    case "500MB/day":
      return 0.5;
    case "1GB/day":
      return 1;
    case "2GB/day":
      return 2;
    case "Fix":
      return 1;
    default:
      return 0;
  }
};

interface DataType {
  data_type: string;
}

const findHighestPriority = (arr: DataType[]): string | null => {
  const priorities: { [key: string]: number } = {
    "1GB/day": 1,
    "2GB/day": 2,
    "500MB/day": 3,
    Fix: 4,
  };

  let highestPriorityItem: string | null = null;
  let highestPriorityValue = Infinity;

  for (let item of arr) {
    const priorityValue = priorities[item?.data_type];
    if (priorityValue && priorityValue < highestPriorityValue) {
      highestPriorityValue = priorityValue;
      highestPriorityItem = item?.data_type;
    }
  }

  return highestPriorityItem;
};

export const transformPlanDetailsCountryRegion = async (items: any) => {
  const response: any = {
    // background_image: items?.background_2x_image || items?.background_image,
    background_image: items?.background_image,
    card_image: items?.card_image,
    country_flag: items?.country_flag,
    name: items?.name,
    popularPlanName: findHighestPriority(items?.plans) ?? "",
    network: items?.network ?? "",
    plan_type_text: items?.plan_type_text ?? "",
    phone_number_sms: items?.phone_number_sms ?? "",
    providers: items?.providers ?? null,
    coverage_data: items?.coverage_data ?? null,

    plans:
      items?.plans
        ?.filter((filterItem: any) => filterItem?.data_type !== "Unlimited")
        ?.map((subItem: any) => ({
          data_type: subItem?.data_type ?? "",
          data_name: subItem?.data_type?.split("/")[0],
          data:
            subItem?.data?.map((obj: any) => ({
              // core_price: Number(obj?.core_price).toFixed(2),
              core_price: Number(obj?.core_price),
              totalData:
                subItem?.data_type === "Fix"
                  ? parseInt(obj?.plan_data?.split("/")[0]?.match(/\d+/)[0])
                  : Number(obj?.plan_days) * getPlanDataValue(obj?.plan_data),
              deals_discount: Number(obj?.deals_discount),
              // deals_discount: Number(obj?.deals_discount).toFixed(2),
              is_popular_deal: obj?.is_popular_deal,
              is_wishlist_added: obj?.is_wishlist_added,
              deal_percentage: obj?.deal_percentage ?? 0,
              plan_data: obj?.plan_data,
              plan_name: obj?.plan_data?.split("/")[0],
              plan_days: obj?.plan_days,
              plan_id: obj?.plan_id,
              // price: Number(obj?.price).toFixed(2),
              price: Number(obj?.price),
              // waoclub_discount: Number(obj?.waoclub_discount).toFixed(2),
              waoclub_discount: Number(obj?.waoclub_discount),
            })) ?? [],
        })) ?? [],
  };

  return response;
};
