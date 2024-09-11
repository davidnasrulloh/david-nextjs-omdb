/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import LoadingScreen from "@/components/LoadingScreen";
import { getDetailsMovies } from "@/service/moviesApi";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React from "react";

function DetailMovies() {
    const { id } = useParams();
    const router = useRouter();

    const { status, fetchStatus, data, isLoading } = useQuery({
        queryKey: ["projects", id],
        queryFn: () => getDetailsMovies({ id: String(id) }),
        enabled: !!id,
    });

    return (
        <section className="p-4">
            {isLoading && <LoadingScreen />}
            {!isLoading && (
                <>
                    <button
                        onClick={() => router.push("/")}
                        className="font-medium cursor-pointer mb-4 hover:translate-x-1 transition-all"
                    >
                        Kembali
                    </button>
                    <div className="p-8 flex flex-row justify-between items-center rounded-lg bg-purple-200 mb-4">
                        <div className="flex flex-col gap-3">
                            <h3 className="text-4xl font-semibold">
                                {data?.Title}
                            </h3>
                            <div className="flex flex-row gap-3 font-medium">
                                <p>{data?.Year}</p>
                                <p>{data?.Rated}</p>
                                <p>{data?.Runtime}</p>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <p>IMDB Rating</p>
                            <p>
                                <span className="font-semibold text-4xl">
                                    {data?.imdbRating}
                                </span>{" "}
                                / 10
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-3">
                        <div className="w-[60%]">
                            <Image
                                width={0}
                                height={0}
                                src={
                                    data?.Poster !== "N/A"
                                        ? data?.Poster
                                        : "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
                                }
                                alt={`Image ${data?.Title}`}
                                sizes="100vw"
                                className="object-cover rounded-xl"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                }}
                            />
                        </div>
                        <div className="flex flex-col gap-1 bg-purple-50 rounded-xl">
                            <h5 className="p-8 text-xl bg-green-300 mx-4 mt-4 rounded-lg">
                                {data?.Plot}
                            </h5>
                            <div className="p-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <p className="font-semibold text-gray-700">
                                        Director:
                                    </p>
                                    <p className="text-gray-700">
                                        {data?.Director}
                                    </p>

                                    <p className="font-semibold text-gray-700">
                                        Writers:
                                    </p>
                                    <p className="text-gray-700">
                                        {data?.Writer}
                                    </p>

                                    <p className="font-semibold text-gray-700">
                                        Actors:
                                    </p>
                                    <p className="text-gray-700">
                                        {data?.Actors}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </section>
    );
}

export default DetailMovies;
