export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  roleOrCompany?: string;
  source: "Google" | "BBB" | "Facebook";
  sourceUrl: string;
  dateStr?: string;
  highlight?: string;
}

export const GOOGLE_REVIEW_URL = "https://g.page/r/Cd8B19AxtAaPEBM/review";
export const GOOGLE_PROFILE_URL = "https://www.google.com/maps/place/Power+Digital+Media+LLC/data=!4m2!3m1!1s0x0:0x8f06b431d0d701df";
export const BBB_PROFILE_URL = "https://www.bbb.org/us/ms/jackson/profile/web-design/power-digital-media-llc-0523-235907954";
export const FACEBOOK_PAGE_URL = "https://www.facebook.com/powerdigitalmediallc";

export const VERIFIED_REVIEWS: Review[] = [
  {
    id: "review-scott-lowery",
    author: "Scott Lowery",
    rating: 5,
    text: "Took my marketing program from the dumps all the way to the moon. Very responsive and results oriented. I highly recommend!!!",
    roleOrCompany: "Owner, Geaux Pro Outdoors (Bentonia, MS)",
    source: "Google",
    sourceUrl: "https://www.google.com/maps/contrib/100169179918227353228/reviews?hl=en",
    highlight: "Took my marketing program all the way to the moon."
  },
  {
    id: "review-josh-watts",
    author: "Josh Watts",
    rating: 5,
    text: "Power Digital Media is my go to company for all of my media needs, including our church website. He was very attentive to detail and met or surpassed every single request. Also, after the site was built, every update or change I needed, he was on top of it very quickly and with excellence. I highly recommend Power Digital Media for any and all your media needs.",
    roleOrCompany: "Pastor, Church 244 (Jackson, MS)",
    source: "Facebook",
    sourceUrl: FACEBOOK_PAGE_URL,
    highlight: "Met or surpassed every single request... on top of every update quickly and with excellence."
  },
  {
    id: "review-in-his-grip",
    author: "In His Grip Ministries",
    rating: 5,
    text: "We met Damein a few weeks ago and had a brief discussion about a website and to see what he came up with for us was nothing short of spectacular! !! We will not only use him for all of our future media projects we highly recommend him! Some people are made for certain things and this brother was made for media work!!",
    roleOrCompany: "Faith Outreach & Ministry",
    source: "Facebook",
    sourceUrl: FACEBOOK_PAGE_URL,
    highlight: "Nothing short of spectacular!! This brother was made for media work!!"
  },
  {
    id: "review-jeff-johnson",
    author: "Jeff Johnson",
    rating: 5,
    text: "I met Damein a few weeks ago and had no idea that God was lining me up for us to have a premium website. Damein was made to do this and does everything with a spirit of excellence. He’s professional and reasonable. Looking for a web guy he is him.",
    roleOrCompany: "In His Grip Ministries",
    source: "Google",
    sourceUrl: "https://www.google.com/maps/contrib/100053009080023180273/reviews",
    highlight: "Does everything with a spirit of excellence. He is him."
  },
  {
    id: "review-joey-nash",
    author: "Joey Nash",
    rating: 5,
    text: "Damein is always right on time. He can figure out what im looking for quickly. Im a picky person and he is patient and professional. I would recommend him to anyone looking for marketing, website building and video editing.",
    roleOrCompany: "Local Business Owner",
    source: "Google",
    sourceUrl: "https://www.google.com/maps/contrib/109130972514691387110/reviews",
    highlight: "Always right on time... patient, professional and highly recommended."
  },
  {
    id: "review-scott-walters",
    author: "Scott Walters",
    rating: 5,
    text: "Does podcast and videography for All Things New. Quality work. Person that you can trust and count on.",
    roleOrCompany: "All Things New",
    source: "Google",
    sourceUrl: "https://www.google.com/maps/contrib/113068142328910561140/reviews?hl=en",
    highlight: "Quality work. Person that you can trust and count on."
  },
  {
    id: "review-chasity-walters",
    author: "Chasity Walters",
    rating: 5,
    text: "Power Digital does a phenomenal job!",
    roleOrCompany: "Verified Customer",
    source: "Google",
    sourceUrl: "https://www.google.com/maps/contrib/107397811917296322135/reviews?hl=en",
    highlight: "Power Digital does a phenomenal job!"
  }
];

export const REVIEWS_SUMMARY = {
  averageRating: 5.0,
  totalReviews: 7,
  fiveStarPercentage: 100,
  platform: "Google & Facebook Verified",
  serviceArea: "Jackson, MS & Central Mississippi",
  owner: "Damein Donald",
  phone: "(601) 446-2393",
  tel: "+16014462393"
};
