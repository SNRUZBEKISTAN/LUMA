import React from 'react';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  AttributeDefinition, 
  ProductAttribute, 
  getAttributesForCategory, 
  groupAttributes, 
  ATTRIBUTE_GROUP_NAMES,
  validateAttributes,
  formatAttributeValue
} from '../../utils/productAttributes';
import { ChevronDown, ChevronUp, AlertCircle, Plus, X } from 'lucide-react';
import { Alert, AlertDescription } from '../ui/alert';

interface ProductAttributesEditorProps {
  categoryPath: string[];
  attributes: ProductAttribute[];
  onChange: (attributes: ProductAttribute[]) => void;
  className?: string;
}

export function ProductAttributesEditor({ 
  categoryPath, 
  attributes, 
  onChange, 
  className = '' 
}: ProductAttributesEditorProps) {
  const [expandedGroups, setExpandedGroups] = React.useState<Record<string, boolean>>({
    basic: true // Основные характеристики развернуты по умолчанию
  });
  const [errors, setErrors] = React.useState<string[]>([]);

  const attributeDefinitions = React.useMemo(() => {
    return getAttributesForCategory(categoryPath);
  }, [categoryPath]);

  const groupedAttributes = React.useMemo(() => {
    return groupAttributes(attributeDefinitions);
  }, [attributeDefinitions]);

  // Валидация при изменении атрибутов
  React.useEffect(() => {
    const validationErrors = validateAttributes(attributes, attributeDefinitions);
    setErrors(validationErrors);
  }, [attributes, attributeDefinitions]);

  const updateAttribute = (id: string, value: any) => {
    const updated = attributes.filter(attr => attr.id !== id);
    if (value !== null && value !== undefined && value !== '') {
      updated.push({ id, value });
    }
    onChange(updated);
  };

  const getAttributeValue = (id: string) => {
    const attr = attributes.find(a => a.id === id);
    return attr?.value || '';
  };

  const toggleGroup = (group: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [group]: !prev[group]
    }));
  };

  const renderAttributeField = (definition: AttributeDefinition) => {
    const value = getAttributeValue(definition.id);
    const isRequired = definition.required;

    switch (definition.type) {
      case 'text':
        return (
          <Input
            id={definition.id}
            value={value}
            onChange={(e) => updateAttribute(definition.id, e.target.value)}
            placeholder={definition.placeholder}
            className="w-full"
          />
        );

      case 'number':
      case 'measurement':
        return (
          <div className="flex items-center gap-2">
            <Input
              id={definition.id}
              type="number"
              value={value}
              onChange={(e) => updateAttribute(definition.id, e.target.value)}
              placeholder={definition.placeholder}
              className="flex-1"
            />
            {definition.unit && (
              <span className="text-sm text-muted-foreground min-w-fit">
                {definition.unit}
              </span>
            )}
          </div>
        );

      case 'select':
        return (
          <Select
            value={value}
            onValueChange={(val) => updateAttribute(definition.id, val)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Выберите значение" />
            </SelectTrigger>
            <SelectContent>
              {definition.options?.map(option => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'multiselect':
        const selectedValues = Array.isArray(value) ? value : [];
        return (
          <div className="space-y-2">
            <div className="flex flex-wrap gap-1">
              {selectedValues.map((val: string) => (
                <Badge 
                  key={val} 
                  variant="secondary" 
                  className="text-xs"
                >
                  {val}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      const updated = selectedValues.filter((v: string) => v !== val);
                      updateAttribute(definition.id, updated);
                    }}
                    className="h-auto p-0 ml-1 hover:bg-transparent"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
            <Select
              onValueChange={(val) => {
                if (!selectedValues.includes(val)) {
                  updateAttribute(definition.id, [...selectedValues, val]);
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Добавить значение" />
              </SelectTrigger>
              <SelectContent>
                {definition.options?.filter(opt => !selectedValues.includes(opt)).map(option => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case 'boolean':
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={definition.id}
              checked={value === true}
              onCheckedChange={(checked) => updateAttribute(definition.id, checked)}
            />
            <Label htmlFor={definition.id}>Да</Label>
          </div>
        );

      case 'color':
        return (
          <div className="flex items-center gap-2">
            <Input
              id={definition.id}
              value={value}
              onChange={(e) => updateAttribute(definition.id, e.target.value)}
              placeholder="Название цвета"
              className="flex-1"
            />
            <input
              type="color"
              className="w-12 h-8 rounded border border-border cursor-pointer"
              onChange={(e) => updateAttribute(definition.id, e.target.value)}
            />
          </div>
        );

      default:
        return (
          <Input
            id={definition.id}
            value={value}
            onChange={(e) => updateAttribute(definition.id, e.target.value)}
            placeholder={definition.placeholder}
          />
        );
    }
  };

  if (attributeDefinitions.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-muted-foreground text-center">
          Выберите категорию товара для отображения атрибутов
        </p>
      </Card>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {errors.length > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <ul className="list-disc pl-4 space-y-1">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {Object.entries(groupedAttributes).map(([groupKey, groupAttributes]) => {
        const isExpanded = expandedGroups[groupKey];
        const groupName = ATTRIBUTE_GROUP_NAMES[groupKey as keyof typeof ATTRIBUTE_GROUP_NAMES] || groupKey;
        
        return (
          <Card key={groupKey} className="overflow-hidden">
            <Button
              variant="ghost"
              onClick={() => toggleGroup(groupKey)}
              className="w-full justify-between p-4 h-auto text-left"
            >
              <div>
                <h3 className="font-medium">{groupName}</h3>
                <p className="text-sm text-muted-foreground">
                  {groupAttributes.length} {groupAttributes.length === 1 ? 'атрибут' : 'атрибутов'}
                </p>
              </div>
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>

            {isExpanded && (
              <div className="px-4 pb-4 space-y-4">
                {groupAttributes.map(definition => (
                  <div key={definition.id} className="space-y-2">
                    <Label htmlFor={definition.id} className="flex items-center gap-2">
                      {definition.name}
                      {definition.required && (
                        <span className="text-destructive text-xs">*</span>
                      )}
                    </Label>
                    {definition.description && (
                      <p className="text-xs text-muted-foreground">
                        {definition.description}
                      </p>
                    )}
                    {renderAttributeField(definition)}
                  </div>
                ))}
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}