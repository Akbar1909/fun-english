import Image from "next/image";

const WordCard = ({
  word,
  wordId,
  wordTagId,
  description,
  example,
  photoUrl,
  wordTag: { tag },
}) => {
  return (
    <section className="bg-primary-main rounded-xl mb-3">
      <div className="text-center py-1 bg-inherit">
        <h2 className="font-light text-3xl text-common-white">
          {tag.toUpperCase()}
        </h2>
      </div>

      <div className="flex flex-col items-center bg-common-white">
        <h3 className="text-center text-4xl font-bold py-1">{word}</h3>
        <p className="text-center text-xl">{description}</p>
        <Image
          className="text-center"
          width={300}
          height={300}
          src={photoUrl}
          alt="bird"
          priority
        />
        <p className="text-center text-xl pt-1 font-extralight">{example}</p>
      </div>

      <div className="bg-inherit text-center py-5"></div>
    </section>
  );
};

export default WordCard;
