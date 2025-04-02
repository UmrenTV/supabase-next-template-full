import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  githubLink?: string;
}

export function ProjectCard({
  title,
  description,
  image,
  tags,
  link,
  githubLink,
}: ProjectCardProps) {
  return (
    <div className="card bg-base-200 shadow-xl">
      <figure className="relative h-48">
        <Image src={image} alt={title} fill className="object-cover" />
      </figure>
      <div className="card-body">
        <h3 className="card-title">{title}</h3>
        <p>{description}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, i) => (
            <div key={i} className="badge badge-secondary">
              {tag}
            </div>
          ))}
        </div>
        <div className="card-actions justify-between items-center mt-4">
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-circle btn-ghost text-base-content hover:text-primary transition-colors"
            >
              <FaGithub className="w-5 h-5" />
            </a>
          )}
          <Link href={link} className="btn btn-primary">
            View Project
          </Link>
        </div>
      </div>
    </div>
  );
}
