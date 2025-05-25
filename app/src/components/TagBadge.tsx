import React from 'react';
import { Link } from '@tanstack/react-router';
import { Badge, BadgeProps } from '@mantine/core';

interface TagBadgeProps {
  tag: string;
  count?: number;
  clickable?: boolean;
  selected?: boolean;
  onSelect?: (tag: string) => void;
}

const TagBadge: React.FC<TagBadgeProps> = ({
  tag,
  count,
  clickable = false,
  selected = false,
  onSelect,
}) => {
  const badgeProps: BadgeProps = {
    size: 'sm',
    variant: selected ? 'filled' : 'light',
    color: selected ? 'violet' : 'gray',
    style: { cursor: clickable ? 'pointer' : undefined },
  };

  if (clickable) {
    return (
      <Badge {...badgeProps} onClick={() => onSelect && onSelect(tag)}>
        {tag}
        {count !== undefined && (
          <span style={{ marginLeft: 4, opacity: 0.7 }}>({count})</span>
        )}
      </Badge>
    );
  }

  return (
    <Badge
      {...badgeProps}
      component={Link}
      to={`/?tag=${encodeURIComponent(tag)}`}
    >
      {tag}
      {count !== undefined && (
        <span style={{ marginLeft: 4, opacity: 0.7 }}>({count})</span>
      )}
    </Badge>
  );
};

export default TagBadge;
