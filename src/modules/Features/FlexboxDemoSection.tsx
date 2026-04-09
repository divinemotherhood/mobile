import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ScrollView
} from 'react-native';

// ─── Types ───────────────────────────────────────────────
type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
type JustifyContent = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
type AlignItems = 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
type FlexWrap = 'wrap' | 'nowrap' | 'wrap-reverse';
type AlignContent = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'stretch';

// ─── Picker Row ──────────────────────────────────────────
const OptionRow = ({
  label, options, selected, onSelect,
}: {
  label: string;
  options: string[];
  selected: string;
  onSelect: (v: string) => void;
}) => (
  <View style={picker.row}>
    <Text style={picker.label}>{label}</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={picker.optionRow}>
        {options.map((opt) => (
          <TouchableOpacity
            key={opt}
            style={[picker.option, selected === opt && picker.selected]}
            onPress={() => onSelect(opt)}
          >
            <Text style={[picker.optionText, selected === opt && picker.selectedText]}>
              {opt}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  </View>
);

// ─── Box Colors ──────────────────────────────────────────
const BOX_COLORS = ['#B388FF', '#673AB7', '#9C27B0', '#7C4DFF', '#E040FB'];

// ─── Main Component ──────────────────────────────────────
export const FlexboxDemoSection = () => {
  // Concept 1 — flexDirection + justifyContent + alignItems
  const [flexDirection, setFlexDirection]     = useState<FlexDirection>('row');
  const [justifyContent, setJustifyContent]   = useState<JustifyContent>('flex-start');
  const [alignItems, setAlignItems]           = useState<AlignItems>('flex-start');

  // Concept 2 — flexWrap + alignContent
  const [flexWrap, setFlexWrap]               = useState<FlexWrap>('nowrap');
  const [alignContent, setAlignContent]       = useState<AlignContent>('flex-start');

  // Concept 3 — flex sizing (flex:1 vs fixed)
  // Concept 4 — alignSelf
  const [alignSelf, setAlignSelf]             = useState<AlignItems>('auto' as any);

  return (
    <View>

      {/* ── CONCEPT 1: Direction + Justify + Align ── */}
      <View style={demo.card}>
        <Text style={demo.conceptTitle}>📐 flexDirection + justifyContent + alignItems</Text>
        <Text style={demo.conceptDesc}>
          flexDirection sets the main axis (row = horizontal, column = vertical).{'\n'}
          justifyContent aligns children along the main axis.{'\n'}
          alignItems aligns children along the cross axis.
        </Text>

        <OptionRow
          label="flexDirection"
          options={['row', 'column', 'row-reverse', 'column-reverse']}
          selected={flexDirection}
          onSelect={(v) => setFlexDirection(v as FlexDirection)}
        />
        <OptionRow
          label="justifyContent"
          options={['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly']}
          selected={justifyContent}
          onSelect={(v) => setJustifyContent(v as JustifyContent)}
        />
        <OptionRow
          label="alignItems"
          options={['flex-start', 'flex-end', 'center', 'stretch', 'baseline']}
          selected={alignItems}
          onSelect={(v) => setAlignItems(v as AlignItems)}
        />

        {/* Live Preview */}
        <View style={[demo.preview, { flexDirection, justifyContent, alignItems }]}>
          {[1, 2, 3].map((n, i) => (
            <View
              key={n}
              style={[
                demo.box,
                { backgroundColor: BOX_COLORS[i], height: 40 + i * 10 }
              ]}
            >
              <Text style={demo.boxText}>{n}</Text>
            </View>
          ))}
        </View>

        <Text style={demo.codeText}>
          {`flexDirection: '${flexDirection}'\njustifyContent: '${justifyContent}'\nalignItems: '${alignItems}'`}
        </Text>
      </View>

      {/* ── CONCEPT 2: flexWrap + alignContent ── */}
      <View style={demo.card}>
        <Text style={demo.conceptTitle}>🔁 flexWrap + alignContent</Text>
        <Text style={demo.conceptDesc}>
          flexWrap controls whether children wrap to next line when they overflow.{'\n'}
          alignContent aligns wrapped lines (only works when flexWrap is 'wrap').
        </Text>

        <OptionRow
          label="flexWrap"
          options={['nowrap', 'wrap', 'wrap-reverse']}
          selected={flexWrap}
          onSelect={(v) => setFlexWrap(v as FlexWrap)}
        />
        <OptionRow
          label="alignContent"
          options={['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'stretch']}
          selected={alignContent}
          onSelect={(v) => setAlignContent(v as AlignContent)}
        />

        <View style={[demo.preview, {
          flexDirection: 'row',
          flexWrap,
          alignContent,
          height: 140,
        }]}>
          {[1, 2, 3, 4, 5].map((n, i) => (
            <View key={n} style={[demo.box, { backgroundColor: BOX_COLORS[i], width: 55 }]}>
              <Text style={demo.boxText}>{n}</Text>
            </View>
          ))}
        </View>

        <Text style={demo.codeText}>
          {`flexWrap: '${flexWrap}'\nalignContent: '${alignContent}'`}
        </Text>
      </View>

      {/* ── CONCEPT 3: flex sizing ── */}
      <View style={demo.card}>
        <Text style={demo.conceptTitle}>📏 flex — how children share space</Text>
        <Text style={demo.conceptDesc}>
          flex: 1 means "take equal share of available space".{'\n'}
          flex: 2 means "take double the space of flex: 1".{'\n'}
          No flex = uses only its own content size.
        </Text>

        <View style={[demo.preview, { flexDirection: 'row', alignItems: 'stretch' }]}>
          <View style={[demo.box, { flex: 1, backgroundColor: BOX_COLORS[0] }]}>
            <Text style={demo.boxText}>flex:1</Text>
          </View>
          <View style={[demo.box, { flex: 2, backgroundColor: BOX_COLORS[1] }]}>
            <Text style={demo.boxText}>flex:2</Text>
          </View>
          <View style={[demo.box, { flex: 1, backgroundColor: BOX_COLORS[2] }]}>
            <Text style={demo.boxText}>flex:1</Text>
          </View>
        </View>

        <View style={[demo.preview, { flexDirection: 'column', height: 180 }]}>
          <View style={[demo.box, { flex: 1, backgroundColor: BOX_COLORS[0] }]}>
            <Text style={demo.boxText}>flex:1</Text>
          </View>
          <View style={[demo.box, { flex: 3, backgroundColor: BOX_COLORS[1] }]}>
            <Text style={demo.boxText}>flex:3</Text>
          </View>
          <View style={[demo.box, { flex: 1, backgroundColor: BOX_COLORS[2] }]}>
            <Text style={demo.boxText}>flex:1</Text>
          </View>
        </View>

        <Text style={demo.codeText}>
          {`// Row: 1+2+1 = 4 parts total\n// flex:1 = 25%, flex:2 = 50%\n\n// Column: 1+3+1 = 5 parts total\n// flex:1 = 20%, flex:3 = 60%`}
        </Text>
      </View>

      {/* ── CONCEPT 4: alignSelf ── */}
      <View style={demo.card}>
        <Text style={demo.conceptTitle}>🎯 alignSelf — override alignItems per child</Text>
        <Text style={demo.conceptDesc}>
          alignSelf lets a single child override the parent's alignItems.{'\n'}
          Box 2 (purple) uses your selected alignSelf. Others follow alignItems: 'flex-start'.
        </Text>

        <OptionRow
          label="alignSelf (box 2)"
          options={['auto', 'flex-start', 'flex-end', 'center', 'stretch']}
          selected={alignSelf}
          onSelect={(v) => setAlignSelf(v as any)}
        />

        <View style={[demo.preview, {
          flexDirection: 'row',
          alignItems: 'flex-start',
          height: 120,
        }]}>
          <View style={[demo.box, { backgroundColor: BOX_COLORS[0], height: 50 }]}>
            <Text style={demo.boxText}>1</Text>
          </View>
          <View style={[demo.box, {
            backgroundColor: BOX_COLORS[1],
            height: 50,
            alignSelf,
          }]}>
            <Text style={demo.boxText}>2{'\n'}✦</Text>
          </View>
          <View style={[demo.box, { backgroundColor: BOX_COLORS[2], height: 50 }]}>
            <Text style={demo.boxText}>3</Text>
          </View>
        </View>

        <Text style={demo.codeText}>
          {`// Parent: alignItems: 'flex-start'\n// Box 2: alignSelf: '${alignSelf}'`}
        </Text>
      </View>

      {/* ── CONCEPT 5: position absolute vs relative ── */}
      <View style={demo.card}>
        <Text style={demo.conceptTitle}>📌 position: absolute vs relative</Text>
        <Text style={demo.conceptDesc}>
          relative (default): child is part of normal flow, other children avoid it.{'\n'}
          absolute: child is removed from flow, positioned using top/left/right/bottom.
        </Text>

        <View style={[demo.preview, { flexDirection: 'row', height: 100 }]}>
          {/* Relative boxes */}
          <View style={[demo.box, { backgroundColor: BOX_COLORS[0], position: 'relative' }]}>
            <Text style={demo.boxText}>relative</Text>
          </View>
          <View style={[demo.box, { backgroundColor: BOX_COLORS[2], position: 'relative' }]}>
            <Text style={demo.boxText}>relative</Text>
          </View>
          {/* Absolute box — floats on top */}
          <View style={[demo.box, {
            backgroundColor: BOX_COLORS[4],
            position: 'absolute',
            top: 10,
            right: 10,
            opacity: 0.92,
          }]}>
            <Text style={demo.boxText}>absolute{'\n'}top:10{'\n'}right:10</Text>
          </View>
        </View>

        <Text style={demo.codeText}>
          {`position: 'absolute'\ntop: 10, right: 10\n// floats over other elements`}
        </Text>
      </View>

      {/* ── CONCEPT 6: gap / rowGap / columnGap ── */}
      <View style={demo.card}>
        <Text style={demo.conceptTitle}>↔️ gap / rowGap / columnGap</Text>
        <Text style={demo.conceptDesc}>
          gap adds space between children automatically — no need for margin on each child.{'\n'}
          rowGap = vertical gap, columnGap = horizontal gap.
        </Text>

        <Text style={demo.subLabel}>gap: 8 (uniform)</Text>
        <View style={[demo.preview, { flexDirection: 'row', flexWrap: 'wrap', gap: 8 }]}>
          {[1, 2, 3, 4].map((n, i) => (
            <View key={n} style={[demo.box, { backgroundColor: BOX_COLORS[i], width: 55 }]}>
              <Text style={demo.boxText}>{n}</Text>
            </View>
          ))}
        </View>

        <Text style={demo.subLabel}>rowGap: 16, columnGap: 4</Text>
        <View style={[demo.preview, { flexDirection: 'row', flexWrap: 'wrap', rowGap: 16, columnGap: 4 }]}>
          {[1, 2, 3, 4].map((n, i) => (
            <View key={n} style={[demo.box, { backgroundColor: BOX_COLORS[i], width: 55 }]}>
              <Text style={demo.boxText}>{n}</Text>
            </View>
          ))}
        </View>

        <Text style={demo.codeText}>{`gap: 8\n// or\nrowGap: 16, columnGap: 4`}</Text>
      </View>

      {/* ── CONCEPT 7: flexGrow / flexShrink / flexBasis ── */}
      <View style={demo.card}>
        <Text style={demo.conceptTitle}>🧮 flexGrow · flexShrink · flexBasis</Text>
        <Text style={demo.conceptDesc}>
          flexBasis: starting size before free space is distributed.{'\n'}
          flexGrow: how much extra space a child takes (0 = none, 1 = grows).{'\n'}
          flexShrink: how much a child shrinks when there is not enough space.{'\n'}
          {'flex: N'} is shorthand for {'flexGrow: N, flexShrink: 1, flexBasis: 0'}.
        </Text>

        <View style={[demo.preview, { flexDirection: 'row' }]}>
          <View style={[demo.box, {
            backgroundColor: BOX_COLORS[0],
            flexBasis: 60, flexGrow: 0, flexShrink: 1,
          }]}>
            <Text style={demo.boxText}>basis:60{'\n'}grow:0</Text>
          </View>
          <View style={[demo.box, {
            backgroundColor: BOX_COLORS[1],
            flexBasis: 60, flexGrow: 1, flexShrink: 1,
          }]}>
            <Text style={demo.boxText}>basis:60{'\n'}grow:1</Text>
          </View>
          <View style={[demo.box, {
            backgroundColor: BOX_COLORS[2],
            flexBasis: 60, flexGrow: 2, flexShrink: 1,
          }]}>
            <Text style={demo.boxText}>basis:60{'\n'}grow:2</Text>
          </View>
        </View>

        <Text style={demo.codeText}>
          {`// Box 1 stays at 60px (grow:0)\n// Box 2 gets 1 share of extra space\n// Box 3 gets 2 shares of extra space`}
        </Text>
      </View>

    </View>
  );
};

// ─── Styles ──────────────────────────────────────────────
const demo = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  conceptTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 6,
  },
  conceptDesc: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
    marginBottom: 10,
  },
  preview: {
    backgroundColor: '#F3EEF9',
    borderRadius: 10,
    padding: 8,
    minHeight: 80,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#E0D4F7',
  },
  box: {
    minWidth: 44,
    minHeight: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },
  boxText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
  },
  codeText: {
    fontFamily: 'monospace',
    fontSize: 11,
    color: '#673AB7',
    backgroundColor: '#F3EEF9',
    padding: 8,
    borderRadius: 6,
    marginTop: 8,
  },
  subLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 8,
    marginBottom: 2,
  },
});

const picker = StyleSheet.create({
  row: {
    marginTop: 8,
  },
  label: {
    fontSize: 11,
    color: '#888',
    marginBottom: 4,
    fontWeight: '600',
  },
  optionRow: {
    flexDirection: 'row',
    gap: 6,
    paddingBottom: 4,
  },
  option: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    backgroundColor: '#F3EEF9',
    borderWidth: 1,
    borderColor: '#E0D4F7',
  },
  selected: {
    backgroundColor: '#673AB7',
    borderColor: '#673AB7',
  },
  optionText: {
    fontSize: 11,
    color: '#673AB7',
    fontWeight: '500',
  },
  selectedText: {
    color: '#FFF',
  },
});