import Icon from "./Icon";
import type { ContentData } from "../types/content";

interface FooterProps {
	data: ContentData;
}

const Footer = ({ data }: FooterProps) => {
  return (
    <footer className="mt-12 text-center text-sm text-gray-500 no-print">
      <div className="flex justify-center gap-4 mb-3">
        {data.footer.social.map((social) => (
          <a
            key={social.name}
            href={data.social_links[social.socialKey]}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label={social.name}
          >
            <Icon name={social.icon} className="h-5 w-5 text-gray-500 hover:text-primary" />
          </a>
        ))}
      </div>
      <p>
        © {new Date().getFullYear()} {data.footer.copyright}
      </p>
    </footer>
  );
};

export default Footer;
