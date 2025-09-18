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

interface ModernTemplateProps {
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
              fontSize: "22px",
              fontWeight: "bold",
              marginBottom: "12px",
            },
            h2: {
              ...textStyle,
              fontSize: "18px",
              fontWeight: "bold",
              marginBottom: "10px",
            },
            h3: {
              ...textStyle,
              fontSize: "16px",
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
        <Section key={section.id} style={imageSectionStyle}>
          <Img
            src={section.metadata.imageUrl}
            alt={section.metadata.imageAlt || "Newsletter image"}
            style={imageStyle}
          />
        </Section>
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

export function ModernTemplate({ newsletter }: ModernTemplateProps) {
  const sortedSections = sortBy(newsletter.sections, ["order"]);

  return (
    <Html>
      <Head />
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Section style={headerSectionStyle}>
            <Heading style={headerHeadingStyle}>{newsletter.subject}</Heading>
          </Section>

          <Section style={contentSectionStyle}>
            {sortedSections.map(renderSection)}
          </Section>

          <Section style={footerSectionStyle}>
            <Text style={footerTextStyle}>
              © 2025 Your Company Name. All rights reserved.
            </Text>
            <Text style={footerSubTextStyle}>
              You received this email because you subscribed to our newsletter.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const bodyStyle = {
  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  margin: "0",
  padding: "0",
  backgroundColor: "#f8fafc",
};

const containerStyle = {
  marginTop: "20px",
  marginBottom: "20px",
  maxWidth: "600px",
  margin: "20px auto",
};

const headerSectionStyle = {
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  padding: "40px",
  borderRadius: "12px 12px 0 0",
  textAlign: "center" as const,
};

const headerHeadingStyle = {
  color: "#ffffff",
  fontSize: "32px",
  fontWeight: "bold",
  margin: "0",
  textShadow: "0 2px 4px rgba(0,0,0,0.1)",
};

const contentSectionStyle = {
  backgroundColor: "#ffffff",
  padding: "40px",
  borderRadius: "0 0 12px 12px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
};

const textStyle = {
  fontSize: "16px",
  lineHeight: "1.6",
  color: "#4a4a4a",
  marginBottom: "20px",
};

const imageSectionStyle = {
  margin: "30px 0",
  textAlign: "center" as const,
};

const imageStyle = {
  maxWidth: "100%",
  height: "auto",
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};

const buttonSectionStyle = {
  textAlign: "center" as const,
  margin: "30px 0",
};

const buttonStyle = {
  display: "inline-block",
  padding: "16px 32px",
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  color: "#ffffff",
  textDecoration: "none",
  borderRadius: "8px",
  fontWeight: "bold",
  fontSize: "14px",
};

const hrStyle = {
  border: "none",
  height: "2px",
  background: "linear-gradient(90deg, #667eea, #764ba2)",
  margin: "30px 0",
  borderRadius: "1px",
};

const footerSectionStyle = {
  padding: "30px 40px",
  textAlign: "center" as const,
};

const footerTextStyle = {
  fontSize: "14px",
  color: "#8b8b8b",
  margin: "0",
};

const footerSubTextStyle = {
  fontSize: "12px",
  color: "#b3b3b3",
  margin: "10px 0 0 0",
};
