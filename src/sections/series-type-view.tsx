import Image from "next/image";
import React from "react";

type Props = { dataSeriesAvailable: any; dataSeriesAllItems: any };

const SeriesTypeView = ({ dataSeriesAvailable, dataSeriesAllItems }: Props) => {
    return (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4 lg:gap-8 justify-center px-4 xl:px-32 my-1">
            {dataSeriesAvailable &&
                dataSeriesAllItems?.map((item: any) => (
                    <div
                        key={item?.imdbID}
                        className="flex flex-row sm:flex-col hover:scale-105 transition-all gap-4 justify-start bg-white rounded-lg shadow-lg hover:shadow-xl duration-300 p-4"
                    >
                        <div className="overflow-hidden rounded-lg w-[12rem] sm:w-auto sm:h-[32rem]">
                            <Image
                                width={0}
                                height={0}
                                src={
                                    item?.Poster !== "N/A"
                                        ? item?.Poster
                                        : "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
                                }
                                alt={`Image ${item?.Title}`}
                                sizes="100vw"
                                className="object-cover"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                }}
                            />
                        </div>
                        <div className="mb-2">
                            <p className="md:mt-4 text-xl text-gray-800 font-semibold">
                                {item?.Title}
                            </p>
                            <p className="my-4">Year : {item?.Year}</p>
                            <a
                                href={`/movies/${item?.imdbID}`}
                                className="bg-blue-500 text-white cursor-pointer rounded-md px-4 py-2 text-center hover:bg-blue-600 transition-all"
                            >
                                Show Details
                            </a>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default SeriesTypeView;
