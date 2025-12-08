import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  AttributeDefinition, 
  ProductAttribute, 
  getAttributesForCategory, 
  groupAttributes, 
  ATTRIBUTE_GROUP_NAMES,
  formatAttributeValue
} from '../utils/productAttributes';
import { ChevronDown, ChevronUp, Package, Palette, Scissors, Ruler, Zap, Globe, Shirt } from 'lucide-react';
import { Button } from './ui/button';

interface ProductAttributesDisplayProps {
  categoryPath: string[];
  attributes: ProductAttribute[];
  compact?: boolean;
  className?: string;
}

export function ProductAttributesDisplay({ 
  categoryPath, 
  attributes, 
  compact = false,
  className = '' 
}: ProductAttributesDisplayProps) {
  const [expandedGroups, setExpandedGroups] = React.useState<Record<string, boolean>>({
    basic: true // Основные характеристики развернуты по умолчанию
  });

  const attributeDefinitions = React.useMemo(() => {
    return getAttributesForCategory(categoryPath);
  }, [categoryPath]);

  const groupedAttributes = React.useMemo(() => {
    return groupAttributes(attributeDefinitions);
  }, [attributeDefinitions]);

  const getAttributeValue = (id: string) => {
    const attr = attributes.find(a => a.id === id);
    return attr?.value;
  };

  const toggleGroup = (group: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [group]: !prev[group]
    }));
  };

  // Иконки для групп
  const getGroupIcon = (groupKey: string) => {
    switch (groupKey) {
      case 'basic': return <Package className="h-4 w-4" />;
      case 'material': return <Palette className="h-4 w-4" />;
      case 'construction': return <Scissors className="h-4 w-4" />;
      case 'sizing': return <Ruler className="h-4 w-4" />;
      case 'technical': return <Zap className="h-4 w-4" />;
      case 'origin': return <Globe className="h-4 w-4" />;
      case 'care': return <Shirt className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  // Фильтруем только заполненные атрибуты
  const filledGroups = Object.entries(groupedAttributes).reduce((acc, [groupKey, groupAttrs]) => {
    const filledAttrs = groupAttrs.filter(def => {
      const value = getAttributeValue(def.id);
      return value !== undefined && value !== null && value !== '';
    });
    
    if (filledAttrs.length > 0) {
      acc[groupKey] = filledAttrs;
    }
    
    return acc;
  }, {} as Record<string, AttributeDefinition[]>);

  if (Object.keys(filledGroups).length === 0) {
    return null;
  }

  const renderAttributeValue = (definition: AttributeDefinition, value: any) => {
    const formattedValue = formatAttributeValue(value, definition);
    
    if (definition.type === 'multiselect' && Array.isArray(value)) {
      return (
        <div className="flex flex-wrap gap-1">
          {value.map((val, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {val}
            </Badge>
          ))}
        </div>
      );
    }
    
    if (definition.type === 'color') {
      return (
        <div className="flex items-center gap-2">
          {typeof value === 'object' && value.hex && (
            <div 
              className="w-4 h-4 rounded border border-border"
              style={{ backgroundColor: value.hex }}
            />
          )}
          <span>{formattedValue}</span>
        </div>
      );
    }
    
    if (definition.type === 'boolean') {
      return (
        <Badge variant={value ? "default" : "secondary"} className="text-xs">
          {formattedValue}
        </Badge>
      );
    }
    
    return <span>{formattedValue}</span>;
  };

  if (compact) {
    // Компактный режим - показываем только ключевые атрибуты в одну строку
    const keyAttributes = ['target_gender', 'main_material', 'size_system', 'country_of_origin'];
    const displayAttrs = keyAttributes
      .map(id => {
        const def = attributeDefinitions.find(d => d.id === id);
        const value = getAttributeValue(id);
        return def && value ? { def, value } : null;
      })
      .filter(Boolean) as { def: AttributeDefinition; value: any }[];

    if (displayAttrs.length === 0) return null;

    return (
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {displayAttrs.map(({ def, value }) => (
          <div key={def.id} className="flex items-center gap-1 text-sm text-muted-foreground">
            <span className="font-medium">{def.name}:</span>
            {renderAttributeValue(def, value)}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {Object.entries(filledGroups).map(([groupKey, groupAttributes]) => {
        const isExpanded = expandedGroups[groupKey];
        const groupName = ATTRIBUTE_GROUP_NAMES[groupKey as keyof typeof ATTRIBUTE_GROUP_NAMES] || groupKey;
        
        return (
          <Card key={groupKey} className="overflow-hidden">
            <Button
              variant="ghost"
              onClick={() => toggleGroup(groupKey)}
              className="w-full justify-between p-4 h-auto text-left hover:bg-muted/50"
            >
              <div className="flex items-center gap-3">
                {getGroupIcon(groupKey)}
                <div>
                  <h4 className="font-medium">{groupName}</h4>
                  <p className="text-sm text-muted-foreground">
                    {groupAttributes.length} {groupAttributes.length === 1 ? 'характеристика' : 'характеристик'}
                  </p>
                </div>
              </div>
              {isExpanded ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>

            {isExpanded && (
              <>
                <Separator />
                <div className="p-4 space-y-3">
                  {groupAttributes.map((definition, index) => {
                    const value = getAttributeValue(definition.id);
                    
                    return (
                      <div key={definition.id}>
                        <div className="flex justify-between items-start gap-4">
                          <span className="text-sm font-medium text-muted-foreground min-w-fit">
                            {definition.name}:
                          </span>
                          <div className="text-sm text-right flex-1">
                            {renderAttributeValue(definition, value)}
                          </div>
                        </div>
                        {index < groupAttributes.length - 1 && (
                          <Separator className="mt-3" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </Card>
        );
      })}
    </div>
  );
}

// Компонент для быстрого просмотра ключевых характеристик
export function ProductAttributesQuick({ 
  categoryPath, 
  attributes, 
  className = '' 
}: ProductAttributesDisplayProps) {
  const keyAttributes = ['target_gender', 'main_material', 'season', 'country_of_origin'];
  const attributeDefinitions = getAttributesForCategory(categoryPath);
  
  const displayAttrs = keyAttributes
    .map(id => {
      const def = attributeDefinitions.find(d => d.id === id);
      const attr = attributes.find(a => a.id === id);
      return def && attr?.value ? { def, value: attr.value } : null;
    })
    .filter(Boolean) as { def: AttributeDefinition; value: any }[];

  if (displayAttrs.length === 0) return null;

  return (
    <div className={`grid grid-cols-2 gap-3 ${className}`}>
      {displayAttrs.map(({ def, value }) => (
        <div key={def.id} className="text-center">
          <div className="text-xs text-muted-foreground font-medium">
            {def.name}
          </div>
          <div className="text-sm mt-1">
            {formatAttributeValue(value, def)}
          </div>
        </div>
      ))}
    </div>
  );
}