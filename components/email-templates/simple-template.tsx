import sortBy from "lodash/sortBy";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Markdown,
  Section,
  Text,
} from "@react-email/components";

import { Newsletter, NewsletterSection } from "@/lib/types";

interface SimpleTemplateProps {
  newsletter: Newsletter;
}

const renderSection = (section: NewsletterSection) => {
  switch (section.type) {
    case "text":
      return (
        <Markdown
          key={section.id}
          markdownCustomStyles={{
            p: textStyle,
            h1: {
              ...textStyle,
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "12px",
            },
            h2: {
              ...textStyle,
              fontSize: "20px",
              fontWeight: "bold",
              marginBottom: "10px",
            },
            h3: {
              ...textStyle,
              fontSize: "18px",
              fontWeight: "bold",
              marginBottom: "8px",
            },
          }}
        >
          {section.content || ""}
        </Markdown>
      );
    case "image":
      return section.metadata?.imageUrl ? (
        <Img
          key={section.id}
          src={section.metadata.imageUrl}
          alt={section.metadata.imageAlt || "Newsletter image"}
          style={imageStyle}
        />
      ) : null;
    case "button":
      return (
        <Section key={section.id} style={buttonSectionStyle}>
          <Link href={section.metadata?.buttonUrl} style={buttonStyle}>
            {section.metadata?.buttonText || section.content}
          </Link>
        </Section>
      );
    case "divider":
      return <Hr key={section.id} style={hrStyle} />;
    default:
      return null;
  }
};

export function SimpleTemplate({ newsletter }: SimpleTemplateProps) {
  const sortedSections = sortBy(newsletter.sections, ["order"]);

  return (
    <Html>
      <Head />
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Heading style={headingStyle}>{newsletter.subject}</Heading>

          <Section>{sortedSections.map(renderSection)}</Section>

          <Hr style={hrStyle} />
          <Text style={footerStyle}>
            © 2025 Your Company Name. All rights reserved.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const bodyStyle = {
  fontFamily: "'Arial', sans-serif",
  margin: "0",
  padding: "0",
  backgroundColor: "#f4f4f4",
};

const containerStyle = {
  backgroundColor: "#ffffff",
  padding: "40px",
  marginTop: "20px",
  marginBottom: "20px",
  maxWidth: "600px",
  margin: "20px auto",
};

const headingStyle = {
  color: "#333333",
  fontSize: "28px",
  fontWeight: "bold",
  marginBottom: "20px",
  textAlign: "center" as const,
  lineHeight: "1.2",
};

const textStyle = {
  fontSize: "16px",
  lineHeight: "1.5",
  color: "#333333",
  marginBottom: "16px",
};

const imageStyle = {
  maxWidth: "100%",
  height: "auto",
  margin: "20px 0",
  display: "block",
};

const buttonSectionStyle = {
  textAlign: "center" as const,
  margin: "20px 0",
};

const buttonStyle = {
  display: "inline-block",
  padding: "12px 24px",
  backgroundColor: "#007bff",
  color: "#ffffff",
  textDecoration: "none",
  borderRadius: "4px",
  fontWeight: "bold",
  fontSize: "14px",
};

const hrStyle = {
  border: "none",
  borderTop: "1px solid #eeeeee",
  margin: "20px 0",
};

const footerStyle = {
  fontSize: "12px",
  color: "#666666",
  textAlign: "center" as const,
  marginTop: "20px",
};
