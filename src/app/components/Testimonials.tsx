// "use client";

// import { Card, Avatar } from "@heroui/react";
// import { motion } from "framer-motion";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/pagination";

// const testimonials = [
//   {
//     id: 1,
//     name: "Sarah Ahmed",
//     role: "Home Chef",
//     image: "https://i.pravatar.cc/150?img=32",
//     review:
//       "TasteBite completely changed my cooking experience. The recipes are easy to follow and absolutely delicious!",
//   },
//   {
//     id: 2,
//     name: "Michael Johnson",
//     role: "Food Blogger",
//     image: "https://i.pravatar.cc/150?img=12",
//     review:
//       "I love the clean interface and recipe collection. It's now my favorite cooking platform.",
//   },
//   {
//     id: 3,
//     name: "Emily Brown",
//     role: "Nutrition Coach",
//     image: "https://i.pravatar.cc/150?img=47",
//     review:
//       "The healthy recipe collection is fantastic. I recommend TasteBite to all my clients.",
//   },
//   {
//     id: 4,
//     name: "David Wilson",
//     role: "Professional Chef",
//     image: "https://i.pravatar.cc/150?img=18",
//     review:
//       "Sharing recipes has never been easier. TasteBite has an amazing food community.",
//   },
// ];

// export default function Testimonials() {
//   return (
//     <section className="bg-default-50 py-20">
//       <div className="mx-auto max-w-7xl px-6">

//         {/* Heading */}

//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           className="mb-14 text-center"
//         >
//           <span className="rounded-full bg-warning/10 px-4 py-2 text-sm font-semibold text-warning">
//             Testimonials
//           </span>

//           <h2 className="mt-5 text-4xl font-bold md:text-5xl">
//             What Our Users Say
//           </h2>

//           <p className="mx-auto mt-4 max-w-2xl text-default-500">
//             Thousands of food lovers trust TasteBite every day.
//           </p>
//         </motion.div>

//         {/* Carousel */}

//         <Swiper
//           modules={[Autoplay, Pagination]}
//           spaceBetween={30}
//           loop={true}
//           autoplay={{
//             delay: 3500,
//             disableOnInteraction: false,
//           }}
//           pagination={{
//             clickable: true,
//           }}
//           breakpoints={{
//             0: {
//               slidesPerView: 1,
//             },
//             768: {
//               slidesPerView: 2,
//             },
//             1200: {
//               slidesPerView: 3,
//             },
//           }}
//         >
//           {testimonials.map((item) => (
//             <SwiperSlide key={item.id}>
//               <Card className="h-[320px] rounded-3xl border p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

//                 <div className="flex h-full flex-col">

//                   {/* Rating */}

//                   <div className="mb-6 text-2xl text-yellow-500">
//                     ⭐⭐⭐⭐⭐
//                   </div>

//                   {/* Review */}

//                   <p className="flex-1 text-default-600 italic leading-8">
//                     {item.review}
//                   </p>

//                   {/* User */}

//                   <div className="mt-8 flex items-center gap-4">

//                     <Avatar
//                       src={item.image}
//                       size="lg"
//                     />

//                     <div>

//                       <h4 className="font-semibold text-lg">
//                         {item.name}
//                       </h4>

//                       <p className="text-default-500 text-sm">
//                         {item.role}
//                       </p>

//                     </div>

//                   </div>

//                 </div>

//               </Card>
//             </SwiperSlide>
//           ))}
//         </Swiper>

//       </div>
//     </section>
//   );
// }



"use client";

import { Card } from "@heroui/react";
import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    id: 1,
    name: "Sarah Ahmed",
    role: "Home Chef",
    image: "https://i.pravatar.cc/150?img=32",
    review:
      "TasteBite completely changed my cooking experience. The recipes are easy to follow and absolutely delicious!",
  },
  {
    id: 2,
    name: "Michael Johnson",
    role: "Food Blogger",
    image: "https://i.pravatar.cc/150?img=12",
    review:
      "I love the clean interface and recipe collection. It's now my favorite cooking platform.",
  },
  {
    id: 3,
    name: "Emily Brown",
    role: "Nutrition Coach",
    image: "https://i.pravatar.cc/150?img=47",
    review:
      "The healthy recipe collection is fantastic. I recommend TasteBite to all my clients.",
  },
  {
    id: 4,
    name: "David Wilson",
    role: "Professional Chef",
    image: "https://i.pravatar.cc/150?img=18",
    review:
      "Sharing recipes has never been easier. TasteBite has an amazing food community.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-default-50 py-20">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <span className="rounded-full bg-warning/10 px-4 py-2 text-sm font-semibold text-warning">
            Testimonials
          </span>

          <h2 className="mt-5 text-4xl font-bold md:text-5xl">
            What Our Users Say
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-default-500">
            Thousands of food lovers trust TasteBite every day.
          </p>
        </motion.div>

        {/* Carousel */}
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1200: {
              slidesPerView: 3,
            },
          }}
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id}>
              <Card className="h-[320px] rounded-3xl border p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="flex h-full flex-col">

                  {/* Rating */}
                  <div className="mb-6 text-2xl text-yellow-500">
                    ⭐⭐⭐⭐⭐
                  </div>

                  {/* Review */}
                  <p className="flex-1 text-default-600 italic leading-8">
                    {item.review}
                  </p>

                  {/* User Profile Footer Row */}
                  <div className="mt-8 flex items-center gap-4">
                    {/* Bypassed HeroUI property constraint with standard optimized HTML image circle component */}
                    <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border border-default-200">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="h-full w-full object-cover" 
                      />
                    </div>

                    <div>
                      <h4 className="font-semibold text-lg text-default-800">
                        {item.name}
                      </h4>
                      <p className="text-default-500 text-sm">
                        {item.role}
                      </p>
                    </div>

                  </div>
                </div>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}